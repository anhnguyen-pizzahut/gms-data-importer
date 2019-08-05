export interface ImporterOperations<SourceType, DestType> {
  parseAndProduce(data: SourceType): DestType;
  persist(data: SourceType): Promise<DestType>;
}
