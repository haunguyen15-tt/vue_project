<script setup lang="ts">
const props = defineProps({
  columns: Array,
  data: Array,
  onDelete: Function,
  onEdit: Function
})

const handleAction = (record: any, action: string) => {
  if (props.onDelete && action === 'DELETE') {
    props.onDelete(record.id)
  }

  if (props.onEdit && action === 'EDIT') {
    props.onEdit(record)
  }
}
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'bloodGroup'">
        <span>
          <a-tag>
            {{ record.bloodGroup.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="handleAction(record, `EDIT`)">Edit 一</a>
          <a @click="handleAction(record, `DELETE`)">Delete</a>
        </span>
      </template>
    </template>
  </a-table>
</template>
