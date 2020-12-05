interface IAnimationDefinition {
    register?: Animation
    keyframes: Keyframe[]
    options: KeyframeAnimationOptions
}
export interface IStateDistinctAnimation {
    enter: IAnimationDefinition 
    leave?: IAnimationDefinition
}