import React from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from '@dnd-kit/core'

import {
  // arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

type Item = { [key in string]: any } & { id: string }

type PropsType = {
  items: Item[]
  onDragEnd: (oldIndex: number, newIndex: number) => void
  children: JSX.Element | JSX.Element[]
}

function SortableContainer(props: PropsType) {
  const { children, onDragEnd, items } = props

  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.fe_id === active.id)
      const newIndex = items.findIndex(c => c.fe_id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
