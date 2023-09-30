import Swal from "sweetalert2";
import axios from "axios";

const CheckLogin = async (props) => {
    try {
        Swal.fire({
            title: 'loading...',
            backdrop : 'true',
            allowOutsideClick : false,
        })
        Swal.showLoading();
        const res = await axios.get('http://localhost:5000/login/isUserAuth' , {
            headers : {
                "x-access-token" : localStorage.getItem("token"),
                "role" : props.role
            }
        })
        Swal.close()
        props.setUser(res.data.user)
        console.log(props.user)
    }
    catch (err) {
        Swal.fire({
            icon : "error",
            title : err.response.data.message
        })
    }
}

export default CheckLogin();