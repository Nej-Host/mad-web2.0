'use client'

import { useState, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarPlus, Clock, Users } from 'lucide-react'
import { Event } from '@madzone/shared'

interface TeamCalendarProps {
  events: Event[]
  onEventClick: (event: Event) => void
  onDateClick: (date: Date) => void
  onEventDrop: (eventId: string, newStart: Date, newEnd?: Date) => void
  loading?: boolean
}

export function TeamCalendar({
  events,
  onEventClick,
  onDateClick,
  onEventDrop,
  loading = false
}: TeamCalendarProps) {
  const [currentView, setCurrentView] = useState<'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'>('dayGridMonth')

  // Convert our events to FullCalendar format
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    backgroundColor: event.color,
    borderColor: event.color,
    extendedProps: {
      description: event.description,
      createdById: event.createdById,
    }
  }))

  const handleEventClick = useCallback((clickInfo: { event: { id: string } }) => {
    const event = events.find(e => e.id === clickInfo.event.id)
    if (event) {
      onEventClick(event)
    }
  }, [events, onEventClick])

  const handleDateClick = useCallback((dateClickInfo: { date: Date }) => {
    onDateClick(new Date(dateClickInfo.date))
  }, [onDateClick])

  const handleEventDrop = useCallback((dropInfo: { event: { id: string; start: Date | null; end?: Date | null } }) => {
    if (dropInfo.event.start) {
      onEventDrop(
        dropInfo.event.id,
        new Date(dropInfo.event.start),
        dropInfo.event.end ? new Date(dropInfo.event.end) : undefined
      )
    }
  }, [onEventDrop])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Týmový kalendář
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Týmový kalendář
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={currentView === 'dayGridMonth' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('dayGridMonth')}
            >
              Měsíc
            </Button>
            <Button
              variant={currentView === 'timeGridWeek' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('timeGridWeek')}
            >
              Týden
            </Button>
            <Button
              variant={currentView === 'timeGridDay' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentView('timeGridDay')}
            >
              Den
            </Button>
            <Button size="sm" onClick={() => onDateClick(new Date())}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              Nová událost
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {events.length} událostí
            </div>
            <Badge variant="outline" className="text-xs">
              Kliknutím na datum vytvoříte novou událost
            </Badge>
          </div>
        </div>
        
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={currentView}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: ''
            }}
            events={calendarEvents}
            editable={true}
            droppable={true}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventDrop}
            height="auto"
            locale="cs"
            firstDay={1} // Monday
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={true}
            nowIndicator={true}
            eventDisplay="block"
            dayMaxEvents={3}
            moreLinkClick="popover"
            buttonText={{
              today: 'Dnes',
              month: 'Měsíc',
              week: 'Týden',
              day: 'Den'
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
