import json
from transformers import pipeline
from typing import Optional
   

def summarize_paragraph_abstractive(summarizer, text):
    try:
        summary = summarizer(text, max_length=250, min_length=25, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        print(f"Error in summarizing: {e}")
        return "NO_SUMMARY"


def summIt():
    try:
        summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
        with open("../dist/news.json", "r") as file:
            data = json.load(file)
            for i in range(len(data)):
                details = data[i]['details'][0:2000]
                print("'"*5+details[0:200])
                summary = summarize_paragraph_abstractive(summarizer, details)
                print("*"*5+summary)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


summIt()