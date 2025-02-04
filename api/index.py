from fastapi import FastAPI, Request
from PIL import Image
import numpy as np

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/testimg")
async def predict_emojis(request: Request):
    body = await request.json()
    img_data = body['array']
    # img_arr = np.array(
    #     list(dict(sorted(img_data.items(),
    #                      key=lambda x: int(x[0]))).values()),
    #     dtype=np.uint8)
    img_arr = np.array(
        list(dict(sorted(img_data.items(),
                         key=lambda x: int(x[0]))).values()),
        dtype=np.uint8).reshape((28, 28))
    # print(img_arr)
    img = Image.fromarray(img_arr, mode="L")
    img.save("./xxx.png")
    return {"predict": 0}