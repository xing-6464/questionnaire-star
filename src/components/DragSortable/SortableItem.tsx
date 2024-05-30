import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type PropType = {
  id: string
  children: JSX.Element
}

function SortableItem(props: PropType) {
  const { id, children } = props

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
