export default function phoneValidator(phone) {
    const phoneRegex = /^\d{10}$/; // Regex for exactly 10 digits
    return phoneRegex.test(phone);
}
