'use client'

import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../buttons/button";

interface ModalProps{
    open: boolean,
    onCancel: () => void,
    title: ReactNode,
    subTitle?: string,
    children: ReactNode,
    useFooterAction?: boolean
    confirmAction?: () => void,
    className?: string
}

export default function Modal(props: ModalProps){
  function onModalClose(){
    props.onCancel()
  }
  function onConfirm(){
    if (props.confirmAction) {
      props.confirmAction();
    }
  }
  return (
      <>
        <div
          className={"justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "}
        >
          <div className={"relative my-6 mx-auto min-w-[50vw] max-w-[80vw] max-md:max-w-[95vw] max-md:my-3 w-full " + props.className}>
            {/*content*/}
            <div className={"border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"}>
              {/*header*/}
              <div className="flex items-start justify-between p-6 max-md:p-3 border-b border-solid border-blueGray-200 rounded-t">
                <div className="flex flex-col gap-2 max-md:gap-1">
                  <h3 className="text-xl font-semibold max-md:text-lg">
                    {props.title}
                  </h3>
                  <p className="text-gray-500 font-xs">{props.subTitle}</p>
                </div>
                <button
                  className="p-1 ml-auto text-black float-right text-3xl"
                  onClick={onModalClose}
                >
                  <IoClose/>
                </button>
              </div>
              {/*body*/}
              <div className="p-6 flex-auto w-full max-md:p-3">
                {props.children}
              </div>
              {/*footer*/}
              {
                props.useFooterAction && (
                  <div className="flex items-center justify-end p-6 gap-2 border-t border-solid border-blueGray-200 rounded-b">
                    <Button onClick={onModalClose} type="danger" size="medium">cancel</Button>
                    <Button onClick={onConfirm} type="primary" size="medium">submit</Button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
  )
}