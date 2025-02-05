from fastapi import FastAPI, Request
from PIL import Image
import numpy as np

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/testimg")
async def predict_digit(request: Request):
    body = await request.json()
    img_arr = np.array(body['array'], dtype=np.uint8)
    return {"predict": 0}

@app.post("/api/py/drawimg")
async def draw_img(request: Request):
    body = await request.json()
    img_arr = np.array(body['array'], dtype=np.uint8)
    img = Image.fromarray(img_arr.reshape((28, 28)))
    img.save("xxx.png")
    return {"predict": 0}