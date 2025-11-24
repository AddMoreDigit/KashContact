import { X, Edit } from 'lucide-react';
import { ServiceData } from './CreateServiceDialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ServiceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceData | null;
  onEdit?: (service: ServiceData) => void;
}

export function ServiceDetailsDialog({ open, onOpenChange, service, onEdit }: ServiceDetailsDialogProps) {
  if (!open || !service) return null;

  const handleEdit = () => {
    if (onEdit && service) {
      onEdit(service);
      onOpenChange(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-black">Service Details</h2>
            <p className="text-gray-500 text-xs mt-1">View complete information about this service</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Banner Image */}
          <div className="mb-6">
            <ImageWithFallback
              src={service.image}
              alt={service.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Service Name */}
          <div className="mb-4">
            <label className="block text-gray-500 text-xs mb-1">Service Name</label>
            <p className="text-gray-900">{service.name}</p>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-500 text-xs mb-1">Location</label>
            <p className="text-gray-900">{service.location}</p>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-500 text-xs mb-1">Category</label>
            <p className="text-gray-900">{service.category}</p>
          </div>

          {/* Price / Rate */}
          <div className="mb-4">
            <label className="block text-gray-500 text-xs mb-1">Price / Rate</label>
            {service.priceRate ? (
              <p className="text-gray-900">R{service.priceRate}</p>
            ) : service.price ? (
              <p className="text-gray-900">{service.price} {service.priceUnit}</p>
            ) : (
              <p className="text-gray-500 text-sm">Not set</p>
            )}
          </div>

          {/* Bookings Status */}
          <div className="mb-4">
            <label className="block text-gray-500 text-xs mb-1">Booking Status</label>
            <p className="text-gray-900">{service.bookings || 'No bookings Yet'}</p>
          </div>

          {/* Availability */}
          <div className="mb-4">
            <label className="block text-gray-500 text-xs mb-1">Availability</label>
            <span className={`inline-block px-3 py-1 rounded-full text-xs ${
              service.available ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {service.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          {/* Description */}
          {service.description && (
            <div className="mb-4">
              <label className="block text-gray-500 text-xs mb-1">Description</label>
              <p className="text-gray-900 text-sm whitespace-pre-wrap">{service.description}</p>
            </div>
          )}

          {/* Terms & Conditions */}
          {service.termsAndConditions && (
            <div className="mb-4">
              <label className="block text-gray-500 text-xs mb-1">Terms & Conditions</label>
              <p className="text-gray-900 text-sm whitespace-pre-wrap">{service.termsAndConditions}</p>
            </div>
          )}

          {/* Gallery */}
          {service.gallery && service.gallery.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-500 text-xs mb-2">Gallery</label>
              <div className="grid grid-cols-3 gap-3">
                {service.gallery.map((img, idx) => (
                  <ImageWithFallback
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Service Provider Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-gray-500 text-xs mb-3">Service Provider Information</label>
            <div className="bg-purple-50 rounded-lg p-4 space-y-2">
              {service.serviceProviderName && (
                <div>
                  <span className="text-xs text-gray-500">Business Name:</span>
                  <p className="text-sm text-gray-900">{service.serviceProviderName}</p>
                </div>
              )}
              {service.serviceProviderEmail && (
                <div>
                  <span className="text-xs text-gray-500">Email:</span>
                  <p className="text-sm text-gray-900">{service.serviceProviderEmail}</p>
                </div>
              )}
              {service.serviceProviderPhone && (
                <div>
                  <span className="text-xs text-gray-500">Phone:</span>
                  <p className="text-sm text-gray-900">{service.serviceProviderPhone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end gap-3">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Service
              </button>
            )}
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}