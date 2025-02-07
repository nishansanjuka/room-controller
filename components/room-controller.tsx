"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DoorOpenIcon as Door, Fan, Lightbulb, Plug2, AppWindowIcon as Window } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ControlCardProps, RoomState, SwitchCardProps } from "@/types"
import { onValue, ref, set } from "firebase/database"
import { db } from "@/lib/firebase-admin"
import { Skeleton } from "@/components/ui/skeleton"

const AnimatedBar = React.memo(({ isOn }: { isOn: boolean }) => (
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
    initial={false}
    animate={{ scaleX: isOn ? 1 : 0 }}
    transition={{ duration: 0.3 }}
  />
))
AnimatedBar.displayName = 'AnimatedBar'

const ControlCard: React.FC<ControlCardProps> = React.memo(({ title, icon: Icon, isOn, isDetected, onToggle }) => (
  <Card className="bg-transparent backdrop-blur-md border-border/50 overflow-hidden">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium flex items-center gap-2">
        <Icon className={`h-5 w-5 ${isOn ? "text-green-500" : "text-muted-foreground"}`} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${isDetected ? "text-green-500" : "text-red-500"}`}>
          {isDetected ? "Detected" : "Not Detected"}
        </span>
        <Switch checked={isOn} onCheckedChange={onToggle} disabled={!isDetected} />
      </div>
    </CardContent>
    <AnimatedBar isOn={isOn} />
  </Card>
))
ControlCard.displayName = 'ControlCard'

const SwitchCard: React.FC<SwitchCardProps> = React.memo(({ number, isOn, onToggle }) => (
  <Card className="bg-card/80 backdrop-blur-md border-border/50 overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {number <= 2 ? <Lightbulb className={`h-5 w-5 ${isOn ? "text-green-500" : "text-muted-foreground"}`} /> : number <= 4 && number > 2 ? <Plug2 className={`h-5 w-5 ${isOn ? "text-green-500" : "text-muted-foreground"}`} /> : <Fan className={`h-5 w-5 ${isOn ? "text-green-500" : "text-muted-foreground"}`} />}
          <span className="text-base font-medium">{`${number <= 2 ?
            `Light ${number}` : number <= 4 && number > 2 ? `Plug ${number - 2}` : "Fan"
            }`}</span>
        </div>
        <Switch checked={isOn} onCheckedChange={onToggle} />
      </div>
    </CardContent>
    <AnimatedBar isOn={isOn} />
  </Card>
))
SwitchCard.displayName = 'SwitchCard'

const ControlCardSkeleton = () => (
  <Card className="bg-transparent backdrop-blur-md border-border/50 overflow-hidden">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium flex items-center gap-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-24" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-10" />
      </div>
    </CardContent>
  </Card>
)

const SwitchCardSkeleton = () => (
  <Card className="bg-card/80 backdrop-blur-md border-border/50 overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-10" />
      </div>
    </CardContent>
  </Card>
)

export default function RoomController(): React.JSX.Element {
  const [state, setState] = React.useState<RoomState>({
    Door: false,
    DoorDetected: false,
    Switch1: false,
    Switch2: false,
    Switch3: false,
    Switch4: false,
    Switch5: false,
    Window: false,
    WindowDetected: false,
  })
  const [isLoading, setIsLoading] = React.useState(true)

  // Update handler
  const handleStateChange = async (newState: Partial<RoomState>) => {
    const updatedState = { ...state, ...newState }
    setState(updatedState)
    try {
      await set(ref(db, 'Room'), updatedState)
    } catch (error) {
      console.error('Failed to update state:', error)
      // Revert state on error
      setState(state)
    }
  }


  React.useEffect(() => {
    const dbRef = ref(db, 'Room');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setState(data || state);
      setIsLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`min-h-screen`}>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
      />
      <div className="relative z-10 min-h-screen pt-20 bg-background/70 backdrop-blur-sm lg:flex lg:items-center">
        <div className="container mx-auto p-4 lg:p-8 lg:grid lg:grid-cols-2 lg:gap-8 space-y-8 lg:space-y-0">
          <Image src={'/bg.png'} alt="bg" width={1280} height={768} className=" rounded-xl h-full object-contain sm:scale-125 lg:scale-[170%]" />
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle className="text-3xl text-center sm:text-left">
                  Controls
                </CardTitle>
                <CardDescription className="text-center sm:text-left">
                  Control various aspects of the room including lights, door, and window status. Toggle switches to manage different devices.
                </CardDescription>
              </CardHeader>
              <div className="grid gap-6 md:grid-cols-2  h-fit">
                {isLoading ? (
                  <>
                    <ControlCardSkeleton />
                    <ControlCardSkeleton />
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SwitchCardSkeleton key={num} />
                    ))}
                  </>
                ) : (
                  <>
                    <ControlCard
                      title="Door"
                      icon={Door}
                      isOn={state.Door}
                      isDetected={state.DoorDetected}
                      onToggle={(checked: boolean) => handleStateChange({ Door: checked })}
                    />
                    <ControlCard
                      title="Window"
                      icon={Window}
                      isOn={state.Window}
                      isDetected={state.WindowDetected}
                      onToggle={(checked: boolean) => handleStateChange({ Window: checked })}
                    />
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SwitchCard
                        key={num}
                        number={num}
                        isOn={state[`Switch${num}` as keyof RoomState]}
                        onToggle={(checked: boolean) =>
                          handleStateChange({ [`Switch${num}`]: checked })}
                      />
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

