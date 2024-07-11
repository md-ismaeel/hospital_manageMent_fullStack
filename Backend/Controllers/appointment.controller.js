const { catchAsyncFun } = require('../Middleware/errorHandler');
const AppointmentModel = require('../Models/appointment.model');



/* create new Appointments */
const createAppointment = async (req, res) => {
    // console.log(req.body);

    console.log("create appointments");
    const { firstName, lastName, email, phone, dob, userId, doctorId, address, appointmentDate, department, hasVisited } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !userId || !doctorId || !address || !appointmentDate || !department || !hasVisited) {

        return res.status(400).json({
            success: false,
            message: "required all fields!"
        })
    }

    // const info = new AppointmentModel({
    //     ...req.body,
    //     status: "Pending"
    // })

    // await info.save()

    const newAppointment = await AppointmentModel.create({
        ...req.body,
        status: "pending"
    })

    res.status(201).json({
        success: true,
        message: "Appointment created successfully!",
        appointmentId: newAppointment._id
    })

}



/* get all Appointments */
const getAllAppointments = async (req, res) => {

    const opts = {};

    if (req.user.role === "PATIENT") {
        opts.userId = req.user._id

    } else if (req.user.role === "DOCTOR") {
        opts.doctorId = req.user._id
    }

    console.log("user id for database", opts)

    const appointments = await AppointmentModel.find(opts).populate({
        path: "userId doctorId",
        select: "firstName lastName email phone"
    })

    res.status(200).json({
        success: true,
        message: "All Appointment data fetched",
        results: appointments
    })
}

/* get all Appointments */
const appointmentEdit = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            success: false,
            message: "Status is Required!"
        })
    }

    const appointment = await AppointmentModel.findById(id).populate("userId doctorId");

    if (!appointment) {
        return res.status(400).json({
            success: false,
            message: "Appointment not founded"
        })
    }

    const role = req.user.role;

    if ((role === "DOCTOR" && (status === "Cancelled" || req.user.email !== appointment.doctorId.email)) || (role === "PATIENT" && (status === "Cancelled" || req.user.email !== appointment.userId.email))) {
        return res.status(403).json({
            success: false,
            message: "Forbidden"
        })
    }

    const editedAppointment = await AppointmentModel.findByIdAndUpdate(id, { status })

    res.status(200).json({
        success: true,
        message: "Appointment edited successfully!!",
        results: editedAppointment
    })


}

const AppointmentController = {
    createAppointment: catchAsyncFun(createAppointment),
    getAllAppointments: catchAsyncFun(getAllAppointments),
    appointmentEdit: catchAsyncFun(appointmentEdit)
}

module.exports = AppointmentController; 