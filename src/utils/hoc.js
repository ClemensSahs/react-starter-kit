

export function getDisplayName(WrappedComponent, extendingName) {
  return `${extendingName}(${WrappedComponent.displayName ||
         WrappedComponent.name ||
         'Component'})`;
}


export default getDisplayName;
