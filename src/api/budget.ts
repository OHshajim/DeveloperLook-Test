import { getDeviceId } from "../utils/device";

export const setBudget = (budget: number) => {
    const deviceId = getDeviceId()
    localStorage.setItem(`budget_${deviceId}`, budget.toString());
}
export const getBudget = () => {
    const deviceId = getDeviceId()
    const budget =  localStorage.getItem(`budget_${deviceId}`);
    return budget ? parseFloat(budget) : 0;
}