import re
import pandas as pd
import pdfplumber
from difflib import get_close_matches
from pathlib import Path

# Your canonical 12 features — ALWAYS returned to the API & agent
CANONICAL_FEATURES = [
    "Bacteroides",
    "Faecalibacterium",
    "Prevotella",
    "Ruminococcus",
    "Bifidobacterium",
    "Clostridium",
    "Escherichia",
    "Akkermansia",
    "Roseburia",
    "Coprococcus",
    "Blautia",
    "Lachnospira"
]

def normalize(text: str) -> str:
    """Normalize strings to improve matching."""
    return re.sub(r'[^a-z]', '', str(text).lower())

def fuzzy_match_column(target_norm, available_norm_cols):
    """Fuzzy match normalized feature names to extracted columns."""
    match = get_close_matches(target_norm, available_norm_cols, n=1, cutoff=0.6)
    return match[0] if match else None

# CSV EXTRACTION
def extract_csv_features(csv_path):
    df = pd.read_csv(csv_path)

    # Normalize CSV column names
    norm_cols = {normalize(c): c for c in df.columns}

    extracted = {}

    for feature in CANONICAL_FEATURES:
        target_norm = normalize(feature)

        # Find best fuzzy match
        match = fuzzy_match_column(target_norm, list(norm_cols.keys()))

        if match:
            colname = norm_cols[match]
            try:
                extracted[feature] = float(df[colname].iloc[0])
            except:
                extracted[feature] = 0.0
        else:
            extracted[feature] = 0.0

    return extracted

# PDF EXTRACTION
def extract_pdf_features(pdf_path):
    extracted = {}

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            tables = page.extract_tables()

            for table in tables:
                if not table:
                    continue

                # Create DataFrame
                df = pd.DataFrame(table[1:], columns=table[0])
                df = df.replace("", None)

                # Case 1: Proper header-based table
                norm_cols = {normalize(c): c for c in df.columns}

                for feature in CANONICAL_FEATURES:
                    target_norm = normalize(feature)
                    match = fuzzy_match_column(target_norm, list(norm_cols.keys()))

                    if match:
                        real_col = norm_cols[match]
                        try:
                            val = float(df[real_col].iloc[0])
                            extracted[feature] = val
                        except:
                            pass  # We'll fill missing later

                # Case 2: PDF with a "Bacteria | Value" two-column format
                if df.shape[1] == 2:
                    names = df.iloc[:, 0].apply(normalize)
                    values = df.iloc[:, 1]

                    for feature in CANONICAL_FEATURES:
                        t_norm = normalize(feature)
                        matches = names[names == t_norm].index
                        if len(matches):
                            try:
                                extracted[feature] = float(values.loc[matches[0]])
                            except:
                                pass

    # Fill missing bacteria with 0.0
    for feature in CANONICAL_FEATURES:
        extracted.setdefault(feature, 0.0)

    return extracted

# PROCESS FILE (ENTRY POINT USED BY web.py)
def process_file(filepath):
    filepath = Path(filepath)

    if filepath.suffix.lower() == ".csv":
        return extract_csv_features(filepath)

    elif filepath.suffix.lower() == ".pdf":
        return extract_pdf_features(filepath)

    else:
        raise ValueError("Unsupported file type. Only PDF and CSV allowed.")

# VALIDATION (USED BY web.py BEFORE SENDING TO AGENT)
def validate_patient_data(data_dict):
    """Check that all canonical features exist in final dict."""
    return all(f in data_dict for f in CANONICAL_FEATURES)