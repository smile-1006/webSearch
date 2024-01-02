const Institute = require("../models/institute");
const User = require("../models/User");

const ITEMS_PER_PAGE = 1000;

exports.getAllInstitute = async(req, res) => {
    try{
            let { page = 1 } = req.query; // Default to page 1 if not provided  
            const search = req.query.search || "";
            let sort = req.query.sort || "state";
            let sector = req.query.sector || "All";
            console.log(sector)
            const SectorOption =  [
                "Government", 
                "Govt aided", 
                "Private-Self Financing", 
                "State Government", 
                "State Private University", 
                "State Government University", 
                "Deemed to be University(Pvt)"
            ];  
            console.log(SectorOption);

            if (typeof req.query.sector === 'string') {
                sector = req.query.sector.split(",");
            } else {
                sector = [...SectorOption];
            }
            req.query.sort?(sort = req.query.sort.split(",")):(sort = [sort]);
                
            let sortBy = {};
            
            if (sort[0] === "state") {
                sortBy = { state: 1 };
            } else if (sort[0] === "aitce_id") {
                sortBy = { aicte_id: 1 };
            } 
            console.log(sortBy);

            const totalCount = await Institute.countDocuments();
            const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

            if (page < 1 || page > totalPages) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid page number",
                });
            }

            const skip = (page - 1) * ITEMS_PER_PAGE;

            const allInstitute = await Institute.find({}, {aicte_id : true, name : true , address : true, address : true, institution_type : true, state : true}).skip(skip).limit(ITEMS_PER_PAGE);
            //const totalInstituteRegistered = allInstitute.length;

            return res.status(200).json({
                success : true,
                //Registered_Institute : totalInstituteRegistered,
                Total_Institute : totalCount,
                Total_Pages : totalPages,
                Current_Page : page,
                data : allInstitute
            })
    }
    catch(error){
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Institute Data`,
			error: error.message,
		});
	}
}


exports.addInstitute = async(req, res) => {
    try{
        const { aicte_id, name, address, district, institution_type, state } = req.body;

        if(!aicte_id || !name || !address || !district || !institution_type || !state){
            return res.status(400).json({
                success : false,
                message : "All Fields are Mandatory"
            })
        }

        //check the auth for AICTE-MEMBER or Admin
        const existingID = await Institute.findOne({ aicte_id});

        if(existingID){
            return res.status(400).json({
                success : false,
                message : "The Institute with this AICTE ID is already registered, please Put unique ID."
            })
        }

        const newInstitution = await Institute.create({
            aicte_id,
            name,
            address,
            district,
            institution_type,
            state
        });

        res.status(200).json({
			success: true,
			message: "Institution Created Successfully",
            data : newInstitution
		});


    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }   
}



exports.findInstituteByAicteID = async(req, res) => {
    try{
        const { aicte_id } = req.params;

        console.log("here is your id", aicte_id);

        console.log(`Searching for institute with AICTE ID: ${aicte_id}`);

        const institute = await Institute.findOne({ aicte_id: aicte_id });

        if(!institute){
            console.log(`No institute found with AICTE ID: ${aicte_id}`);
            return res.status(404).json({
                success : false,
                message : "Institute with this AICTE ID not found!"
            })
        }
        console.log(`Found institute: ${JSON.stringify(institute)}`);
        return res.status(200).json({
            success : true,
            message : "Institute found",
            data : institute
        })
        
    }
    catch(err){
        console.log(`Error occurred: ${err.message}`);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error, please try after some time!"
        })
    }
}

exports.findInstituteByname = async(req, res) => {
    try{
        const { name } = req.params;

        console.log("here is your name", name);

        console.log(`Searching for institute with NAME: ${name}`);

        const institute = await Institute.findOne({ name: name });

        if(!institute){
            console.log(`No institute found with AICTE ID: ${ name}`);
            return res.status(404).json({
                success : false,
                message : "Institute with this NAME not found!"
            })
        }
        console.log(`Found institute: ${JSON.stringify(institute)}`);
        return res.status(200).json({
            success : true,
            message : "Institute found",
            data : institute
        })
        
    }
    catch(err){
        console.log(`Error occurred: ${err.message}`);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error, please try after some time!"
        })
    }
}