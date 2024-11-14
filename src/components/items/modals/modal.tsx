import Button from "../button"
import { IoClose } from "react-icons/io5";

interface ModalProps{
    open: boolean,
    onCancel: Function,
}

export default function Modal(props: ModalProps){
  function onModalClose(){
    props.onCancel()
  }
  return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Modal Title
                </h3>
                <button
                  className="p-1 ml-auto text-black float-right text-3xl"
                  onClick={onModalClose}
                >
                  <IoClose/>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  I always felt like I could do anything. That’s the main
                  thing people are controlled by! Thoughts- their perception
                  of themselves! They're slowed down by their perception of
                  themselves. If you're taught you can’t do anything, you
                  won’t do anything. I was taught I could do everything.
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 gap-2 border-t border-solid border-blueGray-200 rounded-b">
                <Button onClick={onModalClose} type="danger" size="medium">Close</Button>
                <Button onClick={()=>{}} type="primary" size="medium">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}