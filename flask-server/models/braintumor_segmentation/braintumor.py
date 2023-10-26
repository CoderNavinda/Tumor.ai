from .dependencies import *
from .unet import *
from PIL import Image
import os







#for segmentation
upload_folder = "./static"
device = "cpu"
segment_model = None
path = "./model_state_dict.pt"
data_transforms = None

segment_model = UNet().to(device)   #loading the whole model architecture


current_script_path = os.path.abspath(__file__)  # Absolute path of the current script
model_file_path = os.path.join(os.path.dirname(current_script_path), 'model_state_dict.pt')
segment_model.load_state_dict(torch.load(model_file_path, map_location=torch.device('cpu')))


segment_model.eval()    #switch the model from training mode to evaluation mode

data_transforms = transforms.Compose([transforms.Resize(256),transforms.ToTensor()])


#for segmentation
def image_loader(loader, image_name):
    image = Image.open(image_name)
    image = loader(image).float()
    image = torch.tensor(image, requires_grad=False)
    image = image.unsqueeze(0)
    new_tensor = image.clone()
    
    return new_tensor

def process_image(data_transforms, path_name, image_name, filemodel):
    with torch.no_grad():
        img = image_loader(data_transforms, path_name)
        pred = segment_model(img)
        plt.subplot(1,2,1)                      #original image 
        plt.imshow(np.squeeze(img.cpu().numpy()).transpose(1,2,0))
        plt.title('Original Image')

        plt.subplot(1,2,2)                      #segmented image
        plt.imshow(np.squeeze(pred.cpu()) > .5)
        plt.title('Tumour Prediction')
        plt.savefig("%s/%s-SEGMENTED.png" % (upload_folder, image_name), bbox_inches = "tight")



