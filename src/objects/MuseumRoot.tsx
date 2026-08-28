import * as THREE from "three";
import { AncientTree } from "@/src/objects/AncientTree";

interface MuseumRootOptions {
  onSettled: (usedFallback: boolean) => void;
}

/**
 * A single continuous installation. The previous version duplicated a scanned
 * stump, which exposed its cut faces and made the composition feel assembled.
 * The procedural root keeps every branch in the same continuous spatial form.
 */
export class MuseumRoot extends THREE.Group {
  private readonly root = new AncientTree();

  constructor({ onSettled }: MuseumRootOptions) {
    super();
    this.name = "museum-root-installation";
    this.add(this.root);
    queueMicrotask(() => onSettled(false));
  }

  dispose() {
    this.root.dispose();
  }
}
