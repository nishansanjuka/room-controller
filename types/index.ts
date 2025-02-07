
export interface RoomState {
  Door: boolean
  DoorDetected: boolean
  Switch1: boolean
  Switch2: boolean
  Switch3: boolean
  Switch4: boolean
  Switch5: boolean
  Window: boolean
  WindowDetected: boolean
}

export interface ControlCardProps {
  title: string
  icon: React.ElementType
  isOn: boolean
  isDetected: boolean
  onToggle: (checked: boolean) => void
}

export interface SwitchCardProps {
  number: number
  isOn: boolean
  onToggle: (checked: boolean) => void
}
