import { DynamicFormComponentState } from '../state/dynamic-form-component-state';

export const MockApiService = {
    mockFetchUserAsync: async (model: DynamicFormComponentState): Promise<object | null> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        let returnValue: object | null = null;

        if (model.userId === '1') {
            returnValue = {
                firstName: 'Nicolas',
                lastName: 'Cage',
                email: 'ghost.rider@handyman.com'
            };
        }

        if (model.userId === '2') {
            returnValue = {
                personalInfo: {
                    firstName: 'King',
                    lastName: 'Kong',
                    email: 'king.kong@monkeyman.com'
                }
            };
        }

        return returnValue;
    }
}