import { useEffect, useState } from "react";

import { createViewerToken } from "@/actions/token";

import { JwtPayload, jwtDecode } from "jwt-decode";

import { toast } from "sonner";

export const userViewToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewToken = await createViewerToken(hostIdentity);
        setToken(viewToken);

        const decodedToken = jwtDecode(viewToken) as JwtPayload & {
          name?: string;
        };

        if (decodedToken.jti) {
          setIdentity(decodedToken.jti);
        }

        if (decodedToken.name) {
          setName(decodedToken.name);
        }

        // const identity = decodedToken.jti;
        // const name = decodedToken.name;

        // if (identity) {
        //   setIdentity(identity);
        // }

        // if (name) {
        //   setName(name);
        // }
      } catch (error) {
        toast.error("Error creating token");
      }
    };

    createToken();
  }, [hostIdentity]);

  return { token, identity, name };
};
