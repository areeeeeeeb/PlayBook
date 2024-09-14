import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, AlignLeft, Ticket, Users } from 'lucide-react';

export default function Create() {
    
    return (
        <div className="flex p-4 space-x-2 rounded-lg max-w-3xl mx-auto">
            {/* IMAGE */}
            <div className="w-1/3 aspect-square bg-blue-100 rounded-lg p-4"/>

            <div className="w-2/3">
                <input
                    type="text"
                    placeholder="Event Name"
                    className="w-full text-2xl font-semibold  bg-transparent border-b  mb-4 focus:outline-none"
                />

                <div className="bg-black/10 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">Start</span>
                        <span className="ml-auto">Sat, Sep 14</span>
                        <span className="ml-4">11:00 AM</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">End</span>
                        <span className="ml-auto">Sat, Sep 14</span>
                        <span className="ml-4">12:00 PM</span>
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">
                        GMT-04:00 Toronto
                    </div>
                </div>
            </div>
        </div>
    )
}