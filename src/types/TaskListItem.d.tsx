export type TaskListItemProps = {
    id: string
    title: string
    description: string
    completed:boolean
    onChange?: Function
}

export type TaskListItemEventType = {
    action: 'createItem' | 'editItem' | 'deleteItem'
    data?: TaskListItemProps
}