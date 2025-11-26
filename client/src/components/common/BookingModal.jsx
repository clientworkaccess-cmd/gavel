import { Dialog, DialogContent } from "../ui/dialog"

const BookingModal = ({show , setShow}) => {

    return (
        <Dialog open={show} onOpenChange={(open) => !open && setShow(false)}>
            <DialogContent>
                <iframe src="https://outlook.office.com/bookwithme/user/1e2775d1acee4f2884df2b391550520f%40evolveworkforcesolutions.com?anonymous&ismsaljsauthenabled=true" className="w-full h-[60vh] mt-2 rounded-2xl" ></iframe>
            </DialogContent>
        </Dialog>
    )
}

export default BookingModal
