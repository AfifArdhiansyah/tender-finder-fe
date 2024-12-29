export interface MessageModel{
    id: number,
    message: string,
    tender_id: string,
    created_at: string,
    updated_at: string
}

export interface UserMessageModel{
    id: number,
    is_read: boolean,
    is_deleted: boolean,
    user_id: number,
    message_id: number,
    created_at: string,
    updated_at: string,
    message: MessageModel
}