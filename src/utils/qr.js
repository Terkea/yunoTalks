import QRCode from 'qrcode'
import QrcodeDecoder from 'qrcode-decoder';


export const generateQR = (data) => {
	return QRCode.toDataURL(data)
}

/**
 *
 * @param file File datatype
 * @returns {*} Promise
 *
 * generates a local url and pass it to the decodeFromImage
 */
export const readQR = (file) => {
	const qr = new QrcodeDecoder();
	return qr.decodeFromImage(URL.createObjectURL(file))
}
