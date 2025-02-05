from fastapi import FastAPI, Request
from PIL import Image
import numpy as np
from tensorflow import keras

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/testimg")
async def predict_digit(request: Request):
    body = await request.json()
    img_arr = np.array(body['array'], dtype=np.uint8)
    img_arr = img_arr / 255.
    single_image = img_arr.reshape(1, 28, 28, 1)
    model = keras.models.load_model("./api/model/mnist_cnn.keras")
    prediction = model.predict(single_image)
    predicted_class = np.argmax(prediction, axis=1)[0]

    return {"predict": int(predicted_class)}

# @app.post("/api/py/drawimg")
# async def draw_img(request: Request):
#     body = await request.json()
#     img_arr = np.array(body['array'], dtype=np.uint8)
#     img = Image.fromarray(img_arr.reshape((28, 28)))
#     return {"predict": 0}