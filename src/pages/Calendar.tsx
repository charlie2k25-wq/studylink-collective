import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Users, Video } from "lucide-react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Mock events data - in a real app, this would come from your backend
  const events = [
    {
      id: 1,
      title: "JavaScript Workshop",
      type: "workshop",
      date: new Date(2024, 3, 15),
      time: "14:00",
      attendees: 12,
      isOnline: true,
    },
    {
      id: 2,
      title: "React Study Group",
      type: "study-group",
      date: new Date(2024, 3, 18),
      time: "16:00",
      attendees: 8,
      isOnline: true,
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Event Calendar</h1>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
        <Card>
          <CardContent className="p-4">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {event.date.toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.attendees} attending
                      </div>
                      {event.isOnline && (
                        <div className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          Online
                        </div>
                      )}
                    </div>
                  </div>
                  <Button>RSVP</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;