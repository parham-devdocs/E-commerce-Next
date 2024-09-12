const CURRENCY_FORMATTER = new Intl.NumberFormat("eu-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits:0
})


export function formatCurrency(amount:number) {
    return CURRENCY_FORMATTER.format(amount)
}

const Number_FORMATTER = new Intl.NumberFormat("eu-US");

export function formatNumber(number:number) {
    return Number_FORMATTER.format(number)
}