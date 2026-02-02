<script setup lang="ts">
import CitySwitch from '@/components/CitySwitch.vue';
import PositionType from '@/components/PositionType.vue';
import Screen from '@/components/Screen.vue';
const props = defineProps<{
  showCity: boolean;
  showPosition: boolean;
  showScreen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:showCity', val: boolean): void;
  (e: 'update:showPosition', val: boolean): void;
  (e: 'update:showScreen', val: boolean): void;
  (e: 'finish'): void;
}>();

const onScreenConfirm = () => {
  emit('update:showScreen', false);
  emit('finish');
};
</script>

<template>
  <van-popup 
    :show="showCity" 
    @update:show="val => emit('update:showCity', val)"
    position="right" 
    :style="{ width: '100%', height: '100%' }"
  >
    <CitySwitch @close="emit('update:showCity', false)" />
  </van-popup>

  <!-- :show="showPosition" 绑定父组件传的props，控制弹窗初始显示 -->
  <!-- @update:show 同步van-popup的状态变化给父组件 -->
  <van-popup 
    :show="showPosition"
    @update:show="val => emit('update:showPosition', val)"
    position="right" 
    :style="{ width: '100%', height: '100%' }"
  >
    <PositionType @close="emit('update:showPosition', false)" />
  </van-popup>

  <van-popup 
    :show="showScreen" 
    @update:show="val => emit('update:showScreen', val)"
    position="right" 
    :style="{ width: '80%', height: '100%' }"
  >
    <Screen @close="emit('update:showScreen', false)" @confirm="onScreenConfirm" />
  </van-popup>
</template>