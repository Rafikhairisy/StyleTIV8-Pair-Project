class Helper {
    static formatRp(data) {
        const formatted = new Intl.NumberFormat("id-ID", {style: "currency", currency:"IDR"}).format(data)

        return formatted
    }
}

module.exports = Helper