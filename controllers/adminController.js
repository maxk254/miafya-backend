// APIs for controlling the sysstem
// Approve / Reject Verification
// I also need to be able to view all users i can delete them from system for full control
// API for adding doctor
// this api is not working and it is not yet connected to database
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    console.log(
      {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      },
      imageFile
    );
  } catch (error) {}
};

export { addDoctor };
