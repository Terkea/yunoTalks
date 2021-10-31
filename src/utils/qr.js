import QRCode from 'qrcode'

export const generateQR = (data) => {
	return QRCode.toDataURL(data)
}

export const readQR = () => {

}