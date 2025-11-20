


const singleUpload = async (req,res)=>{
    if(!req.file){
        return res.status(400).json({
            message:"No file uploaded"
        });

    }

    try {
        return res.status(200).json({
            message:"File uploaded successfully",
            file:req.file
        })


    }
    catch(error){
        return res.status(500).json({
            message:"Internal Server Error" + error.message
        })
    }

}

const multipleUpload = async ( req,res)=>{
    try {
        if(!req.files || req.files.length === 0){
            return res.status(400).json({
                message:"No files uploaded"
            });
        }
        return res.status(200).json({
            message:"Files uploaded successfully",
            files:req.files
        })

    }
    catch(error){
        return res.status(500).json({
            message:"Internal Server Error" + error.message
        })
    }
}

module.exports = {singleUpload ,multipleUpload};