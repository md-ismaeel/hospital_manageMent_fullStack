const { catchAsyncFun } = require('../Middleware/errorHandler');
const AppointmentModel = require('../Models/appointment.model');



/* create new Appointments */
const createAppointment = async (req, res) => {
    // console.log(req.body);

    console.log("create appointments");
    const { firstName, lastName, email, gender, phone, dob, userId, doctorId, address, appointmentDate, department, hasVisited } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !address || !appointmentDate || !department || hasVisited === undefined) {

        return res.status(400).json({
            success: false,
            message: "All fields required!"
        })
    }

    // const info = new AppointmentModel({
    //     ...req.body,
    //     status: "Pending"
    // })

    // await info.save()

    const newAppointment = await AppointmentModel.create({
        ...req.body,
        status: "Pending"
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
    // console.log("check1");

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

    // const editedAppointment = await AppointmentModel.findByIdAndUpdate(id, { status })
    appointment.status = status;
    await appointment.save()

    res.status(200).json({
        success: true,
        message: "Appointment edited successfully!!",
        results: appointment
    })


}

const AppointmentController = {
    createAppointment: catchAsyncFun(createAppointment),
    getAllAppointments: catchAsyncFun(getAllAppointments),
    appointmentEdit: catchAsyncFun(appointmentEdit)
}

module.exports = AppointmentController; 