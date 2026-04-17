import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";

export const useKTX2Texture = (
  textureUrl,
  transparent = true,
  alphaTestValue = 0.6,
  side = "front"
) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  const material = useMemo(() => {
    if (!texture) return null;

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;

    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent,
      alphaTest: alphaTestValue,
      side: side === "front" ? THREE.FrontSide : THREE.DoubleSide,
    });
  }, [texture, transparent, alphaTestValue, side]);

  return material;
};

useKTX2Texture.preload = (url) => useLoader.preload(THREE.TextureLoader, url);

export const useIconTexture = (
  textureUrl,
  alphaTestValue = 0.2,
) => {
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  const material = useMemo(() => {
    if (!texture) return null;

    texture.colorSpace = THREE.SRGBColorSpace;

    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: alphaTestValue,
      side: THREE.DoubleSide,
    });
  }, [texture, alphaTestValue]);

  return material;
};

useIconTexture.preload = (url) => useLoader.preload(THREE.TextureLoader, url);
