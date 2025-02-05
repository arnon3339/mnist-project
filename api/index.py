from fastapi import FastAPI, Request
import numpy as np
import onnxruntime as ort

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
    single_image = img_arr.reshape(1, 28, 28, 1).astype(np.float32)

    session = ort.InferenceSession("./api/model/mnist_cnn.onnx")
    input_name = session.get_inputs()[0].name
    output_name = session.get_outputs()[0].name
    output = session.run([output_name], {input_name: single_image})
    predicted_class = np.argmax(output[0])

    return {"predict": int(predicted_class)}

# @app.post("/api/py/drawimg")
# async def draw_img(request: Request):
#     body = await request.json()
#     img_arr = np.array(body['array'], dtype=np.uint8)
#     img = Image.fromarray(img_arr.reshape((28, 28)))
#     return {"predict": 0}