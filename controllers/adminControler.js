// APIs for controlling the sysstem


// API for adding doctor
// this api is not working and it is not yet connected to database
const addDoctor = async (req,res) => {

    try {

    const { name, email, password, speciality, degree, experience, about, fees, address} = req.body
    const imageFile = req.file

      console.log({
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      },imageFile);

  } catch(error) {

  }
}

export {addDoctor}












































// the admin can view a doctor who want to join us and verify them
// Admin can see the facility that wants to join us and verify them
// Admin can view all people who craete account and can remove them fro the system if they violate our rules
