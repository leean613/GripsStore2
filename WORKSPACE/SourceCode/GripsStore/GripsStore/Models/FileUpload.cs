namespace GripsStore.Models
{
    public class FileUpload
    {
        public string action;
        public string fileName;
        public string contentType;

        public class FileUploadJson
        {
            public bool success = false;
            public FileUpload fileUpload;
        }
    }
}