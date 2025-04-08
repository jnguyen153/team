from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama2:chat"

# training the model with pre-loaded information
CONTEXT = """
You are an AI assistant for the Venture Development Center (VDC) at UMass Boston.

VDC Overview:
- The VDC supports the launch and growth of technology and life science startups.
- It is a hub for entrepreneurs, students, and researchers—offering space, mentorship, and access to capital and resources.
- Since 2009, VDC companies have raised over $2 billion in funding, created 2,725 jobs, and achieved $1.5 billion in acquisitions.

Programs & Services:
1. Venture Incubation Program (VIP):
   - Designed for seed-stage companies to scale within 9–18 months.
   - Provides access to private wet/dry labs, offices, desks, and networking opportunities.
   - Alumni include founders from UMass, Cornell, MIT, and more.

2. Student Entrepreneur Program (StEP):
   - Offers scholarships, workshops, and mentorship for UMass Boston students interested in startups and innovation careers.
   - Directed by Dr. Shubhro Sen, Executive Director of the VDC.

3. Entrepreneur Visa Sponsorship:
   - Helps international founders launch U.S.-based startups with cap-exempt H-1B visa sponsorship.

4. Core Research Facilities:
   - Provides access to advanced life science and engineering equipment and an animal facility.

Notable Impact:
- 116 companies supported, with diverse founding teams (immigrant, women, and minority representation).
- $321M raised through IPOs (e.g., Flywire, SQZ Biotech).
- Notable exits include PillPack (acquired by Amazon) and Kensho (acquired by S&P).

Location & Contact:
- Located in Wheatley Hall, 3rd Floor, 100 Morrissey Blvd, Boston, MA 02125-3393.
- Email: vdc@umb.edu | Phone: (617) 287-6070

Always answer questions using this information. Do not guess. If something is not mentioned here, say you don’t have that information.
"""


@app.route("/", methods=["GET"])
def home():
    return "Flask server is running!"

@app.route("/chat", methods=["POST", "GET"])
def chat():
    if request.method == "GET":
        return "Chat API is working! Send a POST request."

    try:
        data = request.json
        user_prompt = data.get("prompt", "")

        if not user_prompt:
            return jsonify({"error": "No prompt provided"}), 400

        # ✅ Combine context with user prompt
        full_prompt = f"""
    {CONTEXT}

    Answer the following question clearly and concisely using ONLY the information above. Do not explain your reasoning. Do not restate the context. Do not use filler language. Just answer the question.

    Q: {user_prompt}
    A:"""



        # 🔁 Send to Ollama
        response = requests.post(OLLAMA_URL, json={
            "model": MODEL_NAME,
            "prompt": full_prompt,
            "stream": False
        })

        print("Ollama raw response:", response.text)

        ollama_response = response.json()
        ai_text = ollama_response.get("response", "")

        return jsonify({"response": ai_text})

    except Exception as e:
        print("Error in /chat route:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
