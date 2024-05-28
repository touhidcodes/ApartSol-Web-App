// "use server";

export const bookingRequestActions = async (data: any) => {
  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/booking-applications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
      // cache: "no-store",
    }
  );

  return res;
};
