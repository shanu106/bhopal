from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import json

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Initialize FastAPI app
app = FastAPI()

# Load knowledge base
knowledge_base = {
    "insurance": {
        "types": "We offer health, life, vehicle, and travel insurance.",
        "eligibility": "Eligibility depends on your age and other factors."
    },
    "fds": {
        "interest_rate": "The current FD interest rate is 6.5% annually.",
        "minimum_amount": "The minimum FD amount is $500."
    },
    "loans": {
        "types": "We offer personal, home, car, and education loans.",
        "interest_rate": "Personal loans start at 10.5% annual interest."
    }
}

# Request schema for chatbot input
class ChatRequest(BaseModel):
    query: str

# Helper functions for NLP
def preprocess_query(query):
    tokens = word_tokenize(query.lower())
    stop_words = set(stopwords.words("english"))
    tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    return [lemmatizer.lemmatize(token) for token in tokens]

def find_answer(query):
    processed_query = preprocess_query(query)
    for topic, data in knowledge_base.items():
        if any(key in processed_query for key in data.keys()):
            return list(data.values())[list(data.keys()).index(processed_query[0])]
    return "I'm sorry, I couldn't understand your query. Please rephrase or ask something specific."

# API endpoint
@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
    user_query = chat_request.query
    if not user_query.strip():
        raise HTTPException(status_code=400, detail="Query is missing!")
    response = find_answer(user_query)
    return {"response": response}

# Run the server with: uvicorn chatbot:app --reload
