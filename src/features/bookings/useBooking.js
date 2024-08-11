import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  // REACT QUERY
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    // queryKey: ["booking", Number(bookingId)],
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { booking, isLoading, error };
}
