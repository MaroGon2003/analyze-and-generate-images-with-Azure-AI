// ./scr/components/AzureVisionService

// Importing the Azure SDK client libraries
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

// Authentication requirements
const key = process.env.REACT_APP_apiKey;
const endpoint = process.env.REACT_APP_endPoint;

// Cognitive service features
const options = {
    maxCandidates: 5,
    language: "es"
  };

// Describe Image from URL
export const computerVision = async (url) => {

    // authenticate to Azure service
    const computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

    // describe image using the describeImage method
    const analysis = await computerVisionClient.describeImage(url, options)
    .then((result) => {
        console.log("El resultado es:");
        console.log(result);
        return { "URL": url, ...result};
      })
      .catch((err) => {
        console.log("Ocurrio un error: ");
        console.error(err);
        alert(err + "Sube una imagen con un tamaño más pequeño");
      });

    // all information about image
    console.log("Esto es: " +analysis);
    if(analysis === undefined){
        return "Hay algo mal con la imagen"
    }
    return { "URL": url, ...analysis};
}
