import { axiosConfig } from 'helpers';

export const uploadImage = async (
  image: FormData,
  callBack: (_response: { [key: string]: any }) => void
) => {
  try {
    const data = await axiosConfig
      .post(
        `${process.env.VITE_UPLOAD_URL}?key=${process.env.VITE_UPLOAD_KEY}`,
        image
      )
      .then((r) => r.data);

    callBack(data);
  } catch (error) {
    callBack({
      status: false,
    });
  }
};
