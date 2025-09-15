import base64
import fitz  # PyMuPDF
import io

def extract_text_from_base64(base64_str):
    pdf_data = base64.b64decode(base64_str)
    with fitz.open(stream=pdf_data, filetype="pdf") as doc:
        text = ""
        for page in doc:
            text += page.get_text()
    return text
