import type {TaskListItemProps} from '@/types/TaskListItem.d'

export type TaskListProps = {
    title: string
    data: TaskListItemProps[]
    onChange?: Function
}

export type TaskListEventType = {
    action: 'editTitle' |'createItem' | 'editItem' | 'deleteItem'
    data?: TaskListItemProps | string
}