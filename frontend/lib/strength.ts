export function  getPasswordStrength (password: string): string {
        let strength: number | string = 0;
        if(password.length>=8) strength++;
        if(/[A-Z]/.test(password)) strength++;
        if(/[a-z]/.test(password)) strength++;
        if(/\d/.test(password)) strength++;
        if(/[@$!#%*?&]/.test(password)) strength++;
        
        if(strength===1 || strength===2) return "Weak";
        if(strength===3 || strength===4) return "Moderate";
        if(strength===5) return "Strong";
        
        return strength= ""

    }