import axios, { HttpStatusCode } from "axios";
import { server } from "../service/constant";

class SeekerVali {

    //Check validity of seeker name
    async firstName(firstName: string): Promise<SignupErr> {
        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true,
        };

        if (firstName === "") {
            signupErr.error = "First name cannot be empty";
            signupErr.isValid = false;
            return signupErr;
        }

        return signupErr;

    }

    //Check seeker email availability
    async emailAvailablity(email: string): Promise<SignupErr> {

        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true,
        };

        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegEx.test(email)) {
            try {
                const resp = await axios.get(server + `seekerAvailability/${email}`);
                if (resp.data == HttpStatusCode.Found) {
                    signupErr.error = "This E-mail already registered";
                    signupErr.isValid = false;
                    return signupErr;
                }

                if (resp.data == HttpStatusCode.NotFound) {
                    return signupErr;
                }
                signupErr.error = "Internal server error";
                signupErr.isValid = false;
                return signupErr;
            } catch (error) {
                console.log(error);
                signupErr.error = "Internal server error";
                signupErr.isValid = false;
                return signupErr;
            }
        }
        return signupErr;
    }

    //Check validity of seeker email
    async emailValidity(email: string): Promise<SignupErr> {
        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true
        }

        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            signupErr.error = "E-Mail cannot be empty";
            signupErr.isValid = false;
            return signupErr;
        }

        if (emailRegEx.test(email)) {
            return signupErr;
        }

        signupErr.error = "Invalid E-Mail address";
        signupErr.isValid = false;
        return signupErr;
    }

    //Check validity of mobile number
    async mobileNo(mobNo: string): Promise<SignupErr> {
        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true
        }

        if (mobNo === "") {
            signupErr.error = "Mobile number cannot be empty";
            signupErr.isValid = false;
            return signupErr;
        }

        //Check mobile number start with 94
        if (mobNo.slice(0, 2) === "94") {
            //Is mobile number has 11 digits
            if (!(/^\d{11}$/.test(mobNo))) {
                signupErr.error = "Invalid mobile number";
                signupErr.isValid = false;
                return signupErr;
            } else {
                //Add + mark to begining of mobile number
                const formattedMobNo = '+' + mobNo;

                const resp: SignupErr = await this.mobNoAvailability(formattedMobNo);
                signupErr.content = formattedMobNo;
                signupErr.error = resp.error;
                signupErr.isValid = resp.isValid;
                return signupErr;
            }
        }

        //Check mobile number start with 0
        if (mobNo.charAt(0) === "0") {
            //Is mobile number has 10 digits
            if (!(/^\d{10}$/.test(mobNo))) {
                signupErr.error = "Invalid mobile number";
                signupErr.isValid = false;
                return signupErr;
            } else {
                //Remove 0 and add +94 to beginig of mobile number
                const formattedMobNo = '+94' + (mobNo.slice(1));

                const resp: SignupErr = await this.mobNoAvailability(formattedMobNo);
                signupErr.content = formattedMobNo;
                signupErr.error = resp.error;
                signupErr.isValid = resp.isValid;
                return signupErr;
            }
        }

        //Check mobile number statrt with +94
        if (mobNo.slice(0, 3) === "+94") {
            //Is mobile number has 12 digits and 3rd digit not a 0
            if (!(mobNo.length == 12) || mobNo.charAt(3) === "0" || !(/^\d{10}$/.test(mobNo.slice(1, 11)))) {
                signupErr.error = "Invalid mobile number";
                signupErr.isValid = false;
                return signupErr;
            } else {
                const formattedMobNo = mobNo;

                const resp: SignupErr = await this.mobNoAvailability(formattedMobNo);
                signupErr.content = formattedMobNo;
                signupErr.error = resp.error;
                signupErr.isValid = resp.isValid;
                return signupErr;
            }
        }
        signupErr.error = "Invalid mobile number";
        signupErr.isValid = false;
        return signupErr;
    }

    //Check mobile number availability
    private async mobNoAvailability(mobNo: string): Promise<SignupErr> {
        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true
        }
        try {
            const resp = await axios.get(server + `seekerMobNoAvilability/${mobNo}`);
            if (resp.data == HttpStatusCode.Found) {
                signupErr.error = "This mobile number already registered";
                signupErr.isValid = false;
                return signupErr;
            }

            if (resp.data == HttpStatusCode.NotFound) {
                return signupErr;
            }
            signupErr.error = "Internal server error";
            signupErr.isValid = false;
            return signupErr;

        } catch (error) {
            console.log(error);
            signupErr.error = "Internal server error";
            signupErr.isValid = false;
            return signupErr;
        }
    }

    //Check address validity
    async checkAddFLineValidity(fLine: string): Promise<SignupErr> {
        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true
        }

        if (fLine === ""){
            signupErr.error = "Address cannot be empty";
            signupErr.isValid = false;
            return signupErr;
        }
        return signupErr;
    }

    async checkAddSLineValidity(sLine: string): Promise<SignupErr> {
        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true
        }

        if (sLine === ""){
            signupErr.error = "Second line cannot be empty";
            signupErr.isValid = false;
            return signupErr;
        }
        return signupErr;
    }

    //Check city validity
    async checkCityValidty(city: string): Promise<SignupErr>{
        const signupErr: SignupErr = {
            content: "",
            error: "",
            isValid: true
        }

        if(city === ""){
            signupErr.error = "City cannot be empty";
            signupErr.isValid = false;
            return signupErr;
        }

        return signupErr;
    }



}

export default SeekerVali;